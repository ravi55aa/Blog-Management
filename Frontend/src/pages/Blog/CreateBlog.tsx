import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface IBlog {
    title:string,
    //slug:string,
    // tags:string,
    // status:string,
    //content:string,
    //description:string
}

const initBlog:IBlog = {
    title:'',
    //slug:'',
    // tags:'',
    // status:'',
    //content:'',
    //description:''
}


export default function CreateBlog() {
    
    const [blogData,setBlogData]=useState<IBlog>(initBlog);
    const [content,setContent]=useState('');
    const [image, setImage] = useState<File | null>(null);
    
    const [preview, setPreview] = useState('');

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean'],
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
        const {name,value} = e.target;

        setBlogData((prev)=>({...prev,[name]:value}));

        // if(name =="title"){
        //     generateSlug(value);
        // }
        
        return true;
    };

    // const handleImageChange = (
    //     e: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     const file = e.target.files?.[0];

    //     if (!file) return;

    //     setImage(file);

    //     const imageUrl = URL.createObjectURL(file);

    //     setPreview(imageUrl);
    // };


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();
        
        console.log('@createBlog content',content);
        //validation zod

        const formData = new FormData();

        for(const [key,val] of Object.entries(blogData)){
            formData.append(key, val);   
        }
        
        formData.append('content', content);   

        // formData.append(
        //     'tags',
        //     JSON.stringify(
        //         blogData.tags
        //             .split(',')
        //             .map((tag) => tag.trim())
        //     )
        // );

        if (image) {
            formData.append(
                'featuredImage',
                image
            );
        }

        //api call
        return true;

        /*
        await BlogService.createBlog(
            formData
        );
        */
    };


    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Create Blog
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Create and publish a new article.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Blog Title
                        </label>

                        <input
                            type="text"
                            value={blogData.title}
                            name='title'
                            onChange={handleOnChange}
                            placeholder="Enter blog title"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Slug 
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Slug
                        </label>

                        <input
                            type="text"
                            value={slug}
                            onChange={(e) =>
                                setSlug(e.target.value)
                            }
                            placeholder="blog-title"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    */}

                    {/* Description 
                    {<div>
                        <label className="block text-sm font-medium mb-2">
                            Short Description
                        </label>

                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Brief summary..."
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>}
                    */}

                    {/* Featured Image */}
                    {/* <div>
                        <label className="block text-sm font-medium mb-2">
                            Featured Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full"
                        />

                        {
                        preview && (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="h-52 rounded-lg object-cover"
                                    />
                                )
                        }
                    </div> */}

                    {/* Editor */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Blog Content
                        </label>

                        <div className="border rounded-lg overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                placeholder="Write your blog here..."
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            className="px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100"
                        >
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