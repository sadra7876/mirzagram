import React from "react";
import { MirzaComment } from "../model/comment.interface";
import LikeComponent from "./Like";
import { FaReply } from "react-icons/fa";
export default function CommentComponent(props: { comments: MirzaComment }) {
  const { comments } = props;
  console.log("comments", comments);
  return (
    <div className="flex flex-row flex-wrap justify-between px-8 pt-4">
      {comments.data.map((item, index) => {
        return (
          <>
            <div key={index} className="flex w-full flex-row gap-x-20">
              <div className="flex w-[299px] flex-row gap-2">
                <p className="text-xs font-bold">
                  {item.author.displayName || "موجود نیست"}
                </p>
                <p className="text-[10px] font-normal text-gray-500">
                  ۵ هفته پیش
                </p>
              </div>
              <div className="flex flex-row justify-end gap-4">
                <LikeComponent initialCount={item.likeCount} />
                <p className="text-xs font-bold text-mirza-red">پاسخ</p>
                <FaReply className="font-bold text-mirza-red" />
              </div>
            </div>
            <div className="gap-y-4 text-xs">{item.text}</div>
            {item.replies.length > 0 ? (
              item.replies.map((replie, index) => (
                <>
                  <div
                    key={index}
                    className="flex w-full flex-row gap-x-20 pt-4"
                  >
                    <div className="flex w-[299px] flex-row gap-2 pr-12">
                      <p className="text-xs font-bold">
                        {replie.author.displayName || "موجود نیست"}
                      </p>
                      <p className="text-[10px] font-normal text-gray-500">
                        ۵ هفته پیش
                      </p>
                    </div>
                    <div className="flex flex-row justify-end gap-4">
                      <LikeComponent initialCount={replie.likeCount} />
                      <p className="text-xs font-bold text-mirza-red">پاسخ</p>
                      <FaReply className="font-bold text-mirza-red" />
                    </div>
                  </div>
                  <div className="gap-y-4 pr-12 text-xs">{replie.text}</div>
                </>
              ))
            ) : (
              <></>
            )}
          </>
        );
      })}

      {/* {reply} */}

      {/* <div className="flex w-full flex-row gap-x-20 pt-4">
        <div className="flex w-[299px] flex-row gap-2 pr-12">
          <p className="text-xs font-bold">
            {comments && (comments?.data[0].author.displayName || "موجود نیست")}
          </p>
          <p className="text-[10px] font-normal text-gray-500">۵ هفته پیش</p>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <LikeComponent />
          <p className="text-xs font-bold text-mirza-red">پاسخ</p>
          <FaReply className="font-bold text-mirza-red" />
        </div>
      </div>
      <div className="gap-y-4 pr-12 text-xs">متن ریپلای</div> */}
    </div>
  );
}
