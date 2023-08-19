import Blogs from "@/components/blogs/Blogs";

export default function Dashboard() {
    return (
        <>
            <section class="text-gray-600 body-font overflow-hidden marginTB b-radius">
                <div class="container px-5 py-24 mx-auto">
                    <div class="-my-8 divide-y-2 divide-gray-100">
                        <Blogs />
                        <Blogs />
                        <Blogs />
                    </div>
                </div>
            </section >
        </>
    );
}