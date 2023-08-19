import { Card } from "antd";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

const { Meta } = Card;

function DeleteModal({ closeModal, onDeleteConfirm }) {
  // tailwind delete modaal ui
  return (
    <div className="fixed z-10 inset-0">
      <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            onClick={(e) => {closeModal()}}
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl min-h-max transform transition-all sm:max-w-lg sm:w-full"
              onClick={(e) => {e.stopPropagation()}}
            >
              <div className="flex flex-col gap-4 p-4">
                <p>Are you sure you want to delete?</p>
                <div className="flex justify-end">
                  <button
                    className=" text-red-700 hover:underline font-bold py-2 px-4 rounded"
                    onClick={(e) => {onDeleteConfirm()}}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {closeModal()}}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Blogs({ blog, canDelete }) {
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const fileList = [];
  if (!blog) return null;

  const onDelete = () => {
    setIsDeleteModalShow(true)
  }

  const onDeleteConfirm = async () => {
    const res = await fetch(`/api/blogs/${blog.id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setIsDeleteModalShow(false);
      toast.success("Blog deleted successfully");
    }
  }

  return (
    <>
      <div className="py-8 flex flex-wrap md:flex-nowrap bg-slate-100 my-8">
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col center">
          <Card
            hoverable
            style={{ width: "10rem", height: "12rem" }}
            cover={
              <img
                alt="example"
                src="https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4"
              />
            }
          >
            <Meta title={blog.userEmail} />
          </Card>
        </div>
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
            {blog.title}
          </h2>
          <p className="leading-relaxed">{blog.content}</p>
          {
            canDelete ? (
              <button
                className="text-red-600 hover:underline"
                onClick={onDelete}
              >
                delete
              </button>
            ) : (
              <Link
                className="text-indigo-500 inline-flex items-center mt-4"
                href={`/user/${blog.userEmail}`}
              >
                see al this from user
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            )
          }
        </div>
      </div>
      {isDeleteModalShow && (
        <DeleteModal
          closeModal={() => {
            setIsDeleteModalShow(false);
          }}
          onDeleteConfirm={onDeleteConfirm}
        />
      )}
    </>
  );
}