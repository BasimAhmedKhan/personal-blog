import { Card } from "antd";
import Link from "next/link";

const { Meta } = Card;

export default function Blogs({ blog }) {
  const fileList = [];
  if (!blog) return null;
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
        </div>
      </div>
    </>
  );
}
