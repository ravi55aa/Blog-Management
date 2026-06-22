import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    FileText,
    Clock,
    PencilLine,
} from "lucide-react";

import { blogSchema } from "../../utils/Validation/blogValidation";
import type { IBlog } from "../../Interface/IBlog";
import { BlogService } from "../../api/Services/BlogService";

export default function CreateBlog() {
    const navigate = useNavigate();

    const { blogId } = useParams();

    const [blogData, setBlogData] =
        useState<IBlog>({
        title: "",
        content: "",
        });

    const [htmlContent, setHtmlContent] =
        useState("");

    const [deltaContent, setDeltaContent] =
        useState<unknown>(null);

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    useEffect(() => {
        if (!blogId) return;

        const fetchBlogData = async () => {
            try {
                const res = await BlogService.getABlog(blogId);

                if (!res.success || !res.data) {
                    return res.success;
                }

                const payload = res.data;

                setBlogData({
                    title: payload.title,
                    content: payload.contentHtml,
                });

                setHtmlContent(
                    payload.contentHtml
                );

                setDeltaContent(
                    payload.contentDelta
                );
                
            } catch (error) {

                console.error(error);
            }
        };

        fetchBlogData();
    }, [blogId]);

    const modules = {
        toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }],
        [{ list: "bullet" }],
        ["blockquote"],
        ["link", "image"],
        ["clean"],
        ],
    };

    const plainText = useMemo(() => {
        return htmlContent
        .replace(/<[^>]+>/g, " ")
        .trim();
    }, [htmlContent]);

    const wordCount = useMemo(() => {
        return plainText
        .split(/\s+/)
        .filter(Boolean).length;
    }, [plainText]);

    const charCount = useMemo(() => {
        return plainText.length;
    }, [plainText]);

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

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {

        blogSchema.parse({
            title: blogData.title,
            content: plainText,
        });

        const payload = {
            title: blogData.title,
            contentHtml: htmlContent,
            contentDelta: deltaContent,
        };

        let response;

        if (blogId) {
            response =
            await BlogService.updateBlog(
                blogId,
                payload
            );
        } else {
            response =
            await BlogService.createBlog(
                payload
            );
        }

        if (!response.success) {
            return;
        }

        navigate("/blog/dashboard");
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

            <div className="flex items-center gap-4">

                <button
                onClick={() =>
                    navigate("/dashboard")
                }
                className="
                    p-2
                    rounded-lg
                    hover:bg-slate-100
                "
                >
                <ArrowLeft size={20} />
                </button>

                <div>
                <h1 className="text-xl font-bold text-slate-900">
                    {blogId
                    ? "Edit Blog"
                    : "Create New Blog"}
                </h1>

                <p className="text-sm text-slate-500">
                    {blogId
                    ? "Update your blog content"
                    : "Write and publish your story"}
                </p>
                </div>

            </div>

            </div>
        </div>

        <form
            onSubmit={handleSubmit}
            className="
            max-w-7xl
            mx-auto
            p-6
            "
        >
            <div className="grid lg:grid-cols-4 gap-6">

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">

                {/* Title Card */}
                <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-6
                "
                >
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Blog Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={blogData.title}
                    onChange={handleOnChange}
                    placeholder="Write a captivating title..."
                    className="
                    w-full
                    text-2xl
                    font-semibold
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-teal-500
                    "
                />

                {errors.title && (
                    <p className="text-red-500 text-sm mt-2">
                    {errors.title}
                    </p>
                )}
                </div>

                {/* Editor */}
                <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-6
                "
                >
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Blog Content
                </label>

                <ReactQuill
                    theme="snow"
                    value={htmlContent}
                    modules={modules}
                    onChange={(
                    html,
                    delta,
                    source,
                    editor
                    ) => {
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

                {errors.content && (
                    <p className="text-red-500 text-sm mt-2">
                    {errors.content}
                    </p>
                )}
                </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">

                {/* Insights */}
                <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                "
                >
                <h3 className="font-semibold text-slate-800 mb-5">
                    Blog Insights
                </h3>

                <div className="space-y-4">

                    <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <FileText size={18} />
                        <span>Words</span>
                    </div>

                    <span className="font-semibold">
                        {wordCount}
                    </span>
                    </div>

                    <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <PencilLine size={18} />
                        <span>Characters</span>
                    </div>

                    <span className="font-semibold">
                        {charCount}
                    </span>
                    </div>

                    <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Clock size={18} />
                        <span>Status</span>
                    </div>

                    <span className="text-teal-600 font-medium">
                        {blogId
                        ? "Editing"
                        : "Draft"}
                    </span>
                    </div>

                </div>
                </div>

                {/* Actions */}
                <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                "
                >
                <h3 className="font-semibold text-slate-800 mb-5">
                    Actions
                </h3>

                <div className="space-y-3">

                    <button
                    type="submit"
                    className="
                        w-full
                        py-3
                        rounded-xl
                        bg-teal-600
                        hover:bg-teal-700
                        text-white
                        font-medium
                        transition
                    "
                    >
                    {blogId
                        ? "Update Blog"
                        : "Publish Blog"}
                    </button>

                    <button
                    type="button"
                    onClick={() =>
                        navigate(-1)
                    }
                    className="
                        w-full
                        py-3
                        rounded-xl
                        border
                        border-slate-300
                        hover:bg-slate-100
                    "
                    >
                    Cancel
                    </button>

                </div>
                </div>

            </div>

            </div>
        </form>
        </div>
    );
}