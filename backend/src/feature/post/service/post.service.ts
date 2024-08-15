import { ProfileId, Username } from "@CommonTypes/profile.type";
import { CreatePostRequestDTO } from "../dto/create-post-request.dto";
import { IPostRepository } from "../repository/post.repo";
import { HttpError } from "@utils/http-error";
import { strings } from "resources/strings";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { Profile } from "@feature/profile/repository/profile.entity";
import { Content } from "../repository/entities/content.entity";
import { Hashtag } from "../repository/entities/hashtag.entity";
import { Mention } from "../repository/entities/mention.entity";
import { Post } from "../repository/entities/post.entity";
import { ContentDTO } from "../dto/content.dto";
import { HashtagDTO } from "../dto/hashtag.dto";
import { MentionDTO } from "../dto/mentions.dto";
import { PostDTO } from "../dto/post.dto";
import { PostSummaryDTO } from "../dto/post-summary.dto";
import { convertFileNameToURL } from "@utils/utils";

export class PostService {

    constructor(private readonly postRepo: IPostRepository, private readonly profileRepo: IProfileRepository) {}

    async createPost(profileId: ProfileId, request: CreatePostRequestDTO): Promise<string> {
        const profile = await this.profileRepo.getById(profileId);

        if(!profile || !profile.isActive) {
            throw new HttpError(400, strings.CANNOT_ADD_POST_FOR_PROFILE_ERROR);
        }

        const post = await this.buildPostFromPostRequest(request, profile);
        return await this.postRepo.createOrUpdatePost(post);
    }

    async getPost(profileId: ProfileId, id: string): Promise<PostDTO> {
        let post = await this.postRepo.getPost(id);

        if(!post) {
            throw new HttpError(400, strings.POST_NOT_FOUND_ERROR);
        }

        if(post.owner.id != profileId) {
            throw new HttpError(403, strings.POST_FORBIDDEN_ERROR);
        }

        return {
            id: post?.id,
            ownerProfileId: profileId,
            createdAt: post.createdAt,
            caption: post.caption,
            hashtags: post.hashtags?.map<HashtagDTO>((h) => {
                return {
                    tag: h.tag,
                }
            }),
            mentions: post.mentions?.map<MentionDTO>((m) => {
                return {
                    username: m.mentionedProfile.username,
                }
            }),
            contents: post.contents.sort((c) => c.order).map<ContentDTO>((c) => {
                return {
                    url: convertFileNameToURL(c.fileName, "post"),
                }
            }),
        };
    }

    async editPost(profileId: ProfileId, id: string, modifiedPost: CreatePostRequestDTO): Promise<string> {
        const orgPost = await this.postRepo.getPost(id);

        if(!orgPost) {
            throw new HttpError(400, strings.POST_NOT_FOUND_ERROR);
        }

        if(orgPost.owner.id !== profileId) {
            throw new HttpError(403, strings.POST_FORBIDDEN_ERROR);
        }

        const newPost = await this.editPostFromPostRequest(orgPost, modifiedPost);
        return await this.postRepo.createOrUpdatePost(newPost);
    }

    async getPostsByProfileId(profileId: ProfileId): Promise<PostSummaryDTO[] | null> {
        let posts = await this.postRepo.getPostsByProfile(profileId);

        if(!posts) {
            return null;
        }
        
        return posts.map<PostSummaryDTO>((p) => {
            return {
                id: p.id,
                createdAt: p.createdAt,
                thumbnail: {
                    url: convertFileNameToURL(p.contents.sort((c) => c.order)[0].fileName, "post"),
                },
            }
        })
    }

    private async buildPostFromPostRequest(data: CreatePostRequestDTO, owner: Profile): Promise<Post> {
        const newPost = new Post();

        newPost.owner = owner;
        newPost.caption = data.caption;
        newPost.contents = data.fileNames.map((n, index) => { 
            const c = new Content();
            c.fileName = n;
            c.owner = owner;
            c.order = index;
            return c;
        });

        newPost.mentions = await Promise.all(data.mentions.map(async (m) => {
            let mentionedProfile = await this.profileRepo.getByUsername(m as unknown as Username);
            
            if(!mentionedProfile) {
                throw new HttpError(400, strings.MENTION_USERNAME_NOT_EXIST_ERROR);
            }

            const men = new Mention();
            men.mentionedProfile = mentionedProfile;
            men.mentioningProfile = owner;
            return men;
        }));

        newPost.hashtags = data.caption.match(/#[a-z0-9_]+/g)?.map((h) => {
            const hastag = new Hashtag();
            hastag.tag = h.replace("#", "");
            return hastag;
        });

        return newPost;
    }

    private async editPostFromPostRequest(post: Post, modifiedPost: CreatePostRequestDTO): Promise<Post> {
        post.caption = modifiedPost.caption || post.caption
        post.contents = modifiedPost.fileNames.map((n, index) => { 
            const c = new Content();
            c.fileName = n;
            c.owner = post.owner;
            c.order = index;
            return c;
        });

        post.mentions = await Promise.all(modifiedPost.mentions.map(async (m) => {
            let mentionedProfile = await this.profileRepo.getByUsername(m as unknown as Username);
            
            if(!mentionedProfile) {
                throw new HttpError(400, strings.MENTION_USERNAME_NOT_EXIST_ERROR);
            }

            const men = new Mention();
            men.mentionedProfile = mentionedProfile;
            men.mentioningProfile = post.owner;
            return men;
        }));

        post.hashtags = modifiedPost.caption.match(/#[a-z0-9_]+/g)?.map((h) => {
            const hastag = new Hashtag();
            hastag.tag = h;
            return hastag;
        });

        return post;
    }
}