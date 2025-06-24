import React, { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";
import { PiShareFat } from "react-icons/pi";
// import { useRouter } from "next/navigation";
import { useNavigate } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();
  const navigate = useNavigate();

  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
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
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Giả lập thời gian tải 1 giây
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
  // Component Skeleton Loading
  const SkeletonPost = () => (
    <div className="bg-white border border-gray-300 rounded-2xl h-fit   md:mx-25 my-2">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3 mx-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="flex gap-3 px-5">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="px-5 my-5">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="relative h-120 mb-4 flex justify-center items-center bg-gray-300 animate-pulse">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="px-5 my-5">
        <div className="grid grid-cols-4 text-center py-3 border-b border-gray-300">
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-4 text-center py-2">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-10">Không có bài đăng nào.</div>;
  }

  return (
    <div className="w-full md:px-25 md:py-10 mx-auto">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="bg-white border border-gray-300  rounded-2xl h-fit md:px-5 md:mb-5 mb-3"
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
              <div
                className="hidden md:block cursor-pointer mx-4 px-4 py-1 bg-orange-300 rounded-full"
                onClick={() => 
                  // router.push(`/product/${post.model.modelId}`)
                  navigate(`/product/${post.model.modelId}`)
                }
              >
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
          <div>
            <div
              className="md:hidden w-fit cursor-pointer mx-4 px-4 py-1 bg-orange-300 rounded-full"
              onClick={() => 
                // router.push(`/product/${post.model.modelId}`)
                navigate(`/product/${post.model.modelId}`)
              }
            >
              <div>{post.model.name}</div>
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
          </div>
          <div className="px-5 my-1">
            <div className="grid md:grid-cols-4 grid-cols-3 text-center py-3 border-b border-gray-300">
              <div className="flex items-center justify-center">
                <FcLike className="text-base" />
                <div className="mx-3 text-base">{post.reacts.length || 0}</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-base">{post.comments.length || 0}</div>
                <div className="text-base mx-1">bình luận</div>
              </div>
              <div className="md:flex hidden items-center justify-center">
                <div className="text-base">0</div>
                <div className="text-base mx-1">yêu cầu</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-base">{post.totalShare || 0}</div>
                <div className="text-base mx-1"> chia sẻ</div>
              </div>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-3 text-center py-2">
              <div className="flex items-center justify-center">
                <FaHeart className="text-2xl cursor-pointer hover:text-red-500" />
              </div>
              <div className="flex items-center justify-center">
                <FaRegComment className="text-2xl cursor-pointer hover:text-blue-500" />
              </div>
              <div className="md:flex hidden items-center justify-center">
                <TbArrowsExchange
                  className="text-2xl cursor-pointer hover:text-green-500"
                />
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
