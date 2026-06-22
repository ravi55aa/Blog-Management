import { useNavigate } from "react-router-dom";
import type { IDBBlog } from "../Interface/IBlog";
import { Button, CardContent, Card, Chip, Typography } from "@mui/material";

export const BlogCard = ({ blog,IsMyBlog }: { blog: IDBBlog,IsMyBlog:boolean }) => {

    const navigate=useNavigate();

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

            <div className="flex gap-2">

                <Button
                size="small"
                onClick={() =>
                    navigate(`/blogs/${blog._id}`)
                }
                >
                View
                </Button>

                {IsMyBlog && (
                <Button
                    size="small"
                    variant="contained"
                    onClick={() =>
                    navigate(`/blog/edit/${blog._id}`)
                    }
                    sx={{
                    bgcolor: "#0d9488",
                    }}
                >
                    Edit
                </Button>
                )}

            </div>

            </div>
        </CardContent>
        </Card>
    );
};