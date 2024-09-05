import { ProfileId } from "@CommonTypes/profile.type";
import { Bookmark } from "./bookmark.entity";
import { Repository } from "typeorm";

export interface IBookmarkRepository {
  getBookmark(profileId: ProfileId, postId: string): Promise<Bookmark | null>;
  getBookmarksByProfileId(id: ProfileId): Promise<Bookmark[]>;
  createBookmark(bookmark: Bookmark): Promise<Bookmark>;
  removeBookmark(profileId: ProfileId, postId: string): Promise<boolean>;
  getBookmarkCountByPostId(postId: string): Promise<number>;
}

export class BookmarkRepository implements IBookmarkRepository {
  constructor(private readonly repo: Repository<Bookmark>) {}

  async getBookmark(
    profileId: ProfileId,
    postId: string
  ): Promise<Bookmark | null> {
    return this.repo.findOne({
      where: {
        post: {
          id: postId,
        },
        owner: {
          id: profileId,
        },
      },
    });
  }

  async removeBookmark(profileId: ProfileId, postId: string): Promise<boolean> {
    const result = await this.repo
      .createQueryBuilder()
      .delete()
      .from(Bookmark)
      .where("ownerId = :ownerId and postId = :postId", {
        ownerId: profileId,
        postId,
      })
      .execute();

    if (result.affected) {
      return result.affected > 1;
    }
    return false;
  }

  async getBookmarksByProfileId(id: ProfileId): Promise<Bookmark[]> {
    return this.repo.find({
      where: {
        owner: {
          id,
        },
      },
      relations: ["post", "post.contents", "post.owner"],
    });
  }

  async createBookmark(bookmark: Bookmark): Promise<Bookmark> {
    return this.repo.save(bookmark);
  }

  async getBookmarkCountByPostId(postId: string): Promise<number> {
    return this.repo
      .createQueryBuilder("bookmark")
      .leftJoinAndSelect("bookmark.post", "post")
      .where("bookmark.postId = :postId", { postId })
      .getCount();
  }
}
