import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TagComponent from "../../Shared/Components/tagComponent";
import { getExplore } from "./api/getExplore";
import { PostDetails } from "../../Shared/model/postDetails.interface";

export default function ExplorePage() {
  const [explorePosts, setExplorePosts] = useState<PostDetails[]>();

  const init = async () => {
    const response = await getExplore();
    setExplorePosts(response);
    console.log("first", response);
  };
  useEffect(() => {
    init();

    return () => {};
  }, []);

  return (
    <div className="flex w-full flex-col gap-y-3 px-3">
      <div className="flex h-12 w-80 flex-row items-center rounded-full border bg-white px-2">
        <input
          placeholder="جستجو در افراد، تگ‌ها، واژه‌ها و..."
          className="h-full w-full rounded-full"
        />
        <FiSearch />
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <TagComponent title="طبیعت" />
      </div>
      <div className="h-screen overflow-auto">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="grid gap-4">
            {explorePosts?.map((item, index) => {
              return (
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={item.contents[0].url}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          {/* <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
