import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { blogSchema } from "../../utils/Validation/blogValidation";
import type { IBlog } from "../../Interface/IBlog";
import { BlogService } from "../../api/Services/BlogService";
import { useParams } from "react-router-dom";


export default function CreateBlog() {
    const [blogData, setBlogData] =
        useState<IBlog>({
            title: "",
            content:'',
        });

        const [htmlContent, setHtmlContent] =
        useState("");

        const [deltaContent, setDeltaContent] =
        useState<unknown>(null);

        const [errors, setErrors] =
        useState<Record<string, string>>({});


        //BLOG id for edit the blog
        const {blogId}=useParams();
        
        useEffect(() => {
            if (!blogId) return;

            const fetchBlogData = async () => {
                try {
                    const res = await BlogService.getABlog(blogId);

                    if (!res.success || !res.data) {
                        return;
                    }

                    const payload = res.data;

                    setBlogData({
                        title: payload.title,
                        content: payload.contentHtml,
                    });

                    setHtmlContent(payload.contentHtml);

                    setDeltaContent(payload.contentDelta);

                } catch (error) {
                    console.error(error);
                }
            };

            fetchBlogData();
        }, [blogId]);

    const modules = {
        toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
        ],
    };

    //auto generate the slog
    // const generateSlug = (value: string) => {
    //     const slugValue= value
    //         .toLowerCase()
    //         .trim()
    //         .replace(/\s+/g, '-')
    //         .replace(/[^\w-]+/g, '');

    //     setBlogData((prev)=>({...prev,slug:slugValue}));
    //     return true;
    // };

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement>
        ) => {
        const { name, value } = e.target;

        setBlogData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
            ...prev,
            [name]: "",
            }));
        }
    };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];

    //     if (!file) return;

    //     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    //     if (!allowedTypes.includes(file.type)) {
    //         setErrors((prev) => ({
    //             ...prev,
    //             image: "Invalid image",
    //         }));

    //         return;
    //     }

    //     if (file.size > 2 * 1024 * 1024) {
    //         setErrors((prev) => ({
    //             ...prev,
    //             image: "Max 2MB",
    //         }));

    //         return;
    //     }

    //     setImage(file);

    //     setPreview(URL.createObjectURL(file));
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const plainText =
        htmlContent
            .replace(/<[^>]*>/g, "")
            .trim();

        blogSchema.parse({
            title: blogData.title,
            content: plainText,
        });

        setErrors({});

        const payload = {
            title: blogData.title,

            contentHtml: htmlContent,

            contentDelta: deltaContent,
        };

        const response = await BlogService.createBlog(payload);

        if (!response.success) {
            console.log(response); //check before updating the below code;
            ///setErrors({message:response.error as string});
            return response.success;
        }

        alert("Hurray the blog is created");

        return response.success;
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Create Blog</h1>
            <p className="text-slate-500 mt-2">
                Create and publish a new article.
            </p>
            </div>

            <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6"
            >
            {/* Title */}
            <div>
                <label className="block text-sm font-medium mb-2">Blog Title</label>

                <input
                type="text"
                value={blogData.title}
                name="title"
                onChange={handleOnChange}
                placeholder="Enter blog title"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                Blog Content
                </label>

                <div className="border rounded-lg overflow-hidden">
                <ReactQuill
                    theme="snow"
                    value={htmlContent}
                    modules={modules}
                    onChange={(html, delta, source, editor) => {
                        setHtmlContent(html);

                        setDeltaContent(
                        editor.getContents()
                        );

                        if (errors.content) {
                        setErrors((prev) => ({
                            ...prev,
                            content: "",
                        }));
                        }
                    }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <button className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100">
                cancel Blog
                </button>

                <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                Publish Blog
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}
