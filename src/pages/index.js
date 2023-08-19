import Blogs from "@/components/blogs/Blogs";
import { getAll } from "@/services/blogs";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { toast } from "react-hot-toast";

export default function Dashboard({ blogs }) {
  const session = useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!session.data) {
      toast.error("You need to login first");
      return;
    }
    if (
      e.target.title.value === "" ||
      e.target.title.value.length < 5 ||
      e.target.title.value.length > 50
    ) {
      toast.error("Title must be between 5 and 50 characters");
      return;
    }
    console.log(e.target.message.value, e.target.message.value.length);
    if (
      e.target.message.value === "" ||
      e.target.message.value.length < 100 ||
      e.target.message.value.length > 500
    ) {
      toast.error("Message must be between 100 and 500 characters");
      return;
    }
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({
          title: e.target.title.value,
          content: e.target.message.value,
          userEmail: session.data.user.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        toast.success("Blog created successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  return (
    <main>
      <Head>
        <title>Personal Blogging App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      {session.status === "authenticated" && (
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <form class="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={onSubmit}>
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <h1>Dashboard</h1>
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">Title</label>
                  <input type="text" id="title" name="title" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">Blog</label>
                  <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </section>
      )}
      <section className="text-gray-600 body-font overflow-hidden margin b-radius">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {blogs.map((blog) => (
              <Blogs
                blog={blog}
                key={blog.id}
                canDelete={
                  session.status === "authenticated" &&
                  session.data.user.email === blog.userEmail
                }
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const data = getAll();

  return {
    props: {
      blogs: data,
    },
  };
}
