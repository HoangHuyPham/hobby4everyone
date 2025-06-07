// import React from "react";
// import { FaCircleUser } from "react-icons/fa6";
// import { BsThreeDots } from "react-icons/bs";
// import { IoMdClose } from "react-icons/io";
// import { FcLike } from "react-icons/fc";
// import { FaHeart, FaRegComment } from "react-icons/fa";
// import { TbArrowsExchange } from "react-icons/tb";
// import { PiShareFat } from "react-icons/pi";
// const Home = () => {
//   return (
//     <div className="w-4/5 px-10 py-10">
//       <div className=" bg-white border-1  border-gray-300 rounded-2xl h-fit px-5">
//         <div className="flex items-center justify-between  ">
//           <div className="flex items-center justify-center mr-auto gap-3 w-fit mx-3 py-3">
//             <div>
//               <FaCircleUser className="text-4xl" />
//             </div>
//             <div>
//               <p>Tran Son</p>
//               <p>Thoi gian </p>
//             </div>
//             <div className="mx-4 px-4 py-1 bg-orange-300 rounded-full">
//               <div>Model.Name</div>
//             </div>
//           </div>
//           <div className="flex">
//             <div>
//               <BsThreeDots className="text-xl mx-3" />
//             </div>
//             <div>
//               <IoMdClose className="text-xl mx-3" />
//             </div>
//           </div>
//         </div>
//         <div className="px-5 my-5">
//           <p>
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
//             eaque quidem, quo porro illum ab dolores aperiam optio architecto,
//             beatae minus dicta ea iure non exercitationem dignissimos alias odit
//             voluptates.
//           </p>
//         </div>
//         <div className=" px-5 my-5 flex w-full">
//           <div className=" w-full h-auto bg-gray-200"></div>
//           <div className="px-5  justify-end w-2/3">
//             <div className="mx-2 my-1 w-9/10 h-50 bg-gray-200"></div>
//             <div className=" mx-2 my-1 w-9/10 h-50 bg-gray-200"></div>
//           </div>
//         </div>
//         <div className="px-5 my-5">
//           <div>
//             <div className="grid grid-cols-4 text-center py-3 border-b-1">
//               <div className="justify-center flex items-center">
//                 <FcLike className="text-base" />
//                 <div className="mx-3 text-base">10</div>
//               </div>
//               <div className="justify-center flex items-center">
//                 <div className=" text-base">10</div>
//                 <div className="text-base mx-1">bình luận</div>
//               </div>
//               <div className="justify-center flex items-center">
//                 <div className=" text-base">10</div>
//                 <div className="text-base mx-1">yêu cầu</div>
//               </div>
//               <div className="justify-center flex items-center">
//                 <div className=" text-base">10</div>
//                 <div className="text-base mx-1">lượt chia sẻ</div>
//               </div>
//             </div>
//             <div className="grid grid-cols-4 text-center py-2">
//               <div className="justify-center flex items-center">
//                 <FaHeart className="text-2xl " />
//               </div>
//               <div className="justify-center flex items-center">
//                 <FaRegComment className="text-2xl " />
//               </div>
//               <div className="justify-center flex items-center">
//                 <TbArrowsExchange className="text-2xl" />
//               </div>
//               <div className="justify-center flex items-center">
//                 <PiShareFat className="text-2xl" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
"use client";
import React, { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";
import { PiShareFat } from "react-icons/pi";

// Định nghĩa kiểu dữ liệu trực tiếp trong file
interface ImageDTO {
  imageId: string;
  url: string;
}

interface ModelDTO {
  modelId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CommentDTO {
  commentId: string;
  userName: string;
  context: string;
  createdTime: string;
}

interface ReactDTO {
  reactId: number;
  userName: string;
  reactName: string;
  isPositive: boolean;
  reactTime: string;
}

interface PostResponseDTO {
  postId: string;
  userName: string;
  postTime: string;
  promotionDescription: string;
  model: ModelDTO;
  images: ImageDTO[];
  comments: CommentDTO[];
  reacts: ReactDTO[];
  totalShare?: number;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/model_trade/api/posts/getAllPosts"
        );

        if (!response.ok) {
          throw new Error("Không thể tải bài đăng");
        }
        const data: PostResponseDTO[] = await response.json();

        // Sắp xếp bài viết theo thời gian mới nhất (postTime giảm dần)
        const sortedPosts = data.sort(
          (a: PostResponseDTO, b: PostResponseDTO) => {
            return (
              new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
            );
          }
        );

        setPosts(sortedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Định dạng thời gian
  const formatDate = (dateTime: string): string => {
    return new Date(dateTime).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-10">Không có bài đăng nào.</div>;
  }

  return (
    <div className="w-4/5 px-10 py-10 mx-auto">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="bg-white border border-gray-300 rounded-2xl h-fit px-5 mb-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 w-fit mx-3 py-3">
              <div>
                <FaCircleUser className="text-4xl" />
              </div>
              <div>
                <p className="font-semibold">{post.userName}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(post.postTime)}
                </p>
              </div>
              <div className="mx-4 px-4 py-1 bg-orange-300 rounded-full">
                <div>{post.model.name}</div>
              </div>
            </div>
            <div className="flex">
              <div>
                <BsThreeDots className="text-xl mx-3 cursor-pointer" />
              </div>
              <div>
                <IoMdClose className="text-xl mx-3 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="px-5 my-5">
            <p>{post.promotionDescription}</p>
          </div>
          <div className="px-5 my-5 flex w-full">
            <div className="w-full h-auto bg-gray-200">
              {post.images.length > 0 ? (
                <img
                  src={post.images[0].url}
                  alt={post.model.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  Không có ảnh
                </div>
              )}
            </div>
            <div className="px-5 justify-end w-2/3 flex flex-col gap-2">
              {post.images.slice(1).map((image: ImageDTO, index: number) => (
                <div
                  key={index}
                  className="mx-2 my-1 w-full h-32 bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={post.model.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 my-5">
            <div className="grid grid-cols-4 text-center py-3 border-b border-gray-300">
              <div className="flex items-center justify-center">
                <FcLike className="text-base" />
                <div className="mx-3 text-base">{post.reacts.length || 0}</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-base">{post.comments.length || 0}</div>
                <div className="text-base mx-1">bình luận</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-base">0</div>
                <div className="text-base mx-1">yêu cầu</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-base">{post.totalShare || 0}</div>
                <div className="text-base mx-1">lượt chia sẻ</div>
              </div>
            </div>
            <div className="grid grid-cols-4 text-center py-2">
              <div className="flex items-center justify-center">
                <FaHeart className="text-2xl cursor-pointer hover:text-red-500" />
              </div>
              <div className="flex items-center justify-center">
                <FaRegComment className="text-2xl cursor-pointer hover:text-blue-500" />
              </div>
              <div className="flex items-center justify-center">
                <TbArrowsExchange className="text-2xl cursor-pointer hover:text-green-500" />
              </div>
              <div className="flex items-center justify-center">
                <PiShareFat className="text-2xl cursor-pointer hover:text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
