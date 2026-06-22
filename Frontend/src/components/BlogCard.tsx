import { useNavigate } from "react-router-dom";
import type { IDBBlog } from "../Interface/IBlog";

import {
    Trash2
} from "lucide-react";

import {
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

import { BlogService } from "../api/Services/BlogService";

export const BlogCard = ({ blog,IsMyBlog }: { blog: IDBBlog,IsMyBlog:boolean }) => {

    const navigate=useNavigate();

    const handleDelete = async (blogId:string) => {
        if (!blogId) return;

        // S W A L

        try {
            
            const res=await BlogService.deleteBlog(blogId);
            return res.success;

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <Card 
        elevation={0}
        sx={{
            border: "1px solid #e2e8f0",
            borderRadius: 4,
            height: "100%",
        }}
        >
        <CardContent>
            <div className="flex items-center justify-between mb-3">

            <Chip
                label={blog.createdAt && new Date(
                blog.createdAt
                ).toLocaleDateString()}
                size="small"
            />

            </div>

            <Typography
            variant="h6"
            sx={{
                fontWeight: 700,
                mb: 2,
            }}
            >
            {blog.title}
            </Typography>

            <Typography
            sx={{
                color: "#64748b",
                mb: 3,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}
            >
            {new DOMParser()
                .parseFromString(
                blog.contentHtml,
                "text/html"
                )
                .body.textContent}
            </Typography>

            <div className="flex items-center justify-between">

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {blog.createdAt && new Date(
                blog.createdAt
                ).toLocaleString()}
            </Typography>

            <div className="flex items-center gap-2">

                <Button
                    size="small"
                    onClick={() =>
                        navigate(`/blog/${blog._id}`)
                    }
                    >
                    View
                    </Button>

                    {IsMyBlog && (
                    <>
                        <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                            navigate(`/blog/edit/${blog._id}`)
                        }
                        sx={{
                            bgcolor: "#0d9488",
                            "&:hover": {
                            bgcolor: "#0f766e",
                            },
                        }}
                        >
                        Edit
                        </Button>

                        <Tooltip title="Delete Blog">
                        <IconButton
                            size="small"
                            onClick={()=>blog?._id && handleDelete(blog?._id)}
                            sx={{
                            color: "#dc2626",
                            }}
                        >
                            <Trash2 size={18} />
                        </IconButton>
                        </Tooltip>
                    </>
                    )}

            </div>

            </div>
        </CardContent>
        </Card>
    );
};