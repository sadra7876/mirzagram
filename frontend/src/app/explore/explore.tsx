import React, { useEffect, useState } from "react";
import { getExplore } from "./api/getExplore";
import { PostDetails } from "../../Shared/model/postDetails.interface";
import { useNavigate } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
export default function ExplorePage() {
  const [explorePosts, setExplorePosts] = useState<PostDetails[]>();
  const navigate = useNavigate();
  const init = async () => {
    const response = await getExplore();
    setExplorePosts(response);
  };
  useEffect(() => {
    init();

    return () => {};
  }, []);

  return (
    <div className="flex w-full flex-col gap-y-3 px-3">
      <p>اکسپلور</p>
      <div className="h-screen overflow-auto">
        <div className="flex flex-wrap gap-4">
          {explorePosts?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-[437px] w-[304px] cursor-pointer flex-col rounded-lg border bg-white"
                onClick={() => navigate(`/singlePost?postId=${item.id}`)}
              >
                <img
                  className="h-4/5 max-w-full rounded-t-lg"
                  src={item.contents[0].url}
                  alt=""
                />
                <div className="flex w-full flex-col justify-center rounded-lg bg-white p-3">
                  <div className="mb-2 flex gap-3">
                    <div className="flex items-center justify-center">
                      <LuMessageCircle />
                      <p className="text-xs">{item.commentCount}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <LuHeart />
                      <p className="text-xs">{item.likeCount}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <CiBookmark />
                      <p className="text-xs">{item.bookmarkCount}</p>
                    </div>
                  </div>
                  <div className="flex gap-x-3">
                    <div className="size-9 rounded-full bg-black"></div>
                    <div className="flex flex-col gap-y-2">
                      <p className="text-xs font-extrabold">امیر فراهانی</p>
                      <p className="text-xs">۱۷۰ هزار دنبال کننده</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
