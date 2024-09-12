import { useEffect, useState } from "react";
import { getBookmarks } from "./api/getBookmarks";
import { ResponsePosts } from "../../model/post.interface";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import { ResponseBookmark } from "../../model/bookmark.interface";

export default function BookmarksPage() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<ResponseBookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const bookmarks = await getBookmarks();
      setBookmarks(bookmarks);
    } catch (error) {
      // toast.error('Failed to fetch bookmarks.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="mx-8 flex flex-col">
      <div className="mb-4 flex w-full flex-row">
        <p className="text-2xl font-bold">ذخیرها</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              onClick={() => navigate(`/singlePost?postId=${bookmark.post.id}`)}
              className="group relative block size-60 cursor-pointer overflow-hidden rounded-3xl bg-black md:size-60"
            >
              <img
                alt=""
                src={bookmark.post.thumbnail}
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
