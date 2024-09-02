import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { IBookmarkRepository } from "../repository/bookmark.repo";
import { ProfileId } from "@CommonTypes/profile.type";
import { BookmarkRequestDTO } from "../dto/bookmark-request.dto";
import { Bookmark } from "../repository/bookmark.entity";
import { ClientError } from "@utils/http-error";
import { strings } from "resources/strings";
import { IPostRepository } from "@feature/post/repository/post.repo";
import { convertFileNameToURL } from "@utils/utils";

interface Dependencies {
  bookmarkRepo: IBookmarkRepository;
  profileRepo: IProfileRepository;
  postRepo: IPostRepository;
}

export class BookmarkService {
  constructor(private readonly deps: Dependencies) {}

  async getProfileBookmarks(profileId: ProfileId) {
    const bookmarks =
      await this.deps.bookmarkRepo.getBookmarksByProfileId(profileId);

    return bookmarks.map((b) => {
      return {
        id: b.id,
        createdAt: b.createdAt,
        post: {
          id: b.post.id,
          thumbnail: convertFileNameToURL(
            b.post.contents.sort((c) => c.order)[0].fileName,
            "post"
          ),
        },
      };
    });
  }

  async bookmarkPost(profileId: ProfileId, bookmarkReq: BookmarkRequestDTO) {
    const bookmark = await this.deps.bookmarkRepo.getBookmark(
      profileId,
      bookmarkReq.postId
    );
    if (bookmark) {
      return;
    }

    const profile = await this.deps.profileRepo.getById(profileId);
    if (!profile || !profile.isActive) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const post = await this.deps.postRepo.getPost(bookmarkReq.postId);
    if (!post) {
      throw new ClientError(strings.POST_NOT_FOUND_ERROR);
    }

    const newBookmark = new Bookmark();
    newBookmark.post = post;
    newBookmark.owner = profile;

    await this.deps.bookmarkRepo.createBookmark(newBookmark);
  }

  async removeBookmark(profileId: ProfileId, bookmarkReq: BookmarkRequestDTO) {
    await this.deps.bookmarkRepo.removeBookmark(profileId, bookmarkReq.postId);
    return;
  }
}
