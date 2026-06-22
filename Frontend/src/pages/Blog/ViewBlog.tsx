import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Typography,
} from "@mui/material";

import {
    ArrowLeft,
    Calendar,
    Clock3,
} from "lucide-react";  

import { useAppNavigate } from "../../hooks/useNavigate";
import type { IDBBlog } from "../../Interface/IBlog";
import { useEffect, useState } from "react";
import { BlogService } from "../../api/Services/BlogService";
import { useParams } from "react-router-dom";


export default function BlogViewPage() {
    
    const navigate = useAppNavigate();
    
    const {blogId} = useParams();

    const [blog,setBlog]=useState<IDBBlog | null>();

    useEffect(()=>{

        if(!blogId){
            return;
        }

        const fetchBlog = async () => {
            const res = await BlogService.getABlog(blogId);

            if(!res.success){
                return res.success;
            }
            
            setBlog(res?.data || null);
        };

        fetchBlog()

    },[blogId]);

    return (
        <div className="min-h-screen bg-slate-50">
        <Container maxWidth="md" className="py-10">

            {/* Back Button */}
            <Button
            startIcon={<ArrowLeft size={18} />}
            onClick={() => navigate("/blog/dashboard")}
            sx={{
                textTransform: "none",
                mb: 4,
            }}
            >
            Back to Blogs
            </Button>

            {/* Blog Card */}
            <Box
            className="bg-white rounded-3xl shadow-sm"
            sx={{
                p: { xs: 3, md: 6 },
                border: "1px solid #e2e8f0",
            }}
            >
            {/* Title */}
            <Typography
                variant="h3"
                sx={{
                fontWeight: 800,
                color: "#0f172a",
                mb: 3,
                }}
            >
                {blog?.title}
            </Typography>

            {/* Author */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <Avatar
                sx={{
                    bgcolor: "#0d9488",
                }}
                >
                { blog?.userId && blog?.userId?.name[0]?.toUpperCase() || 'R'}
                </Avatar>

                <div>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 700,
                    }}
                    >
                    {blog?.userId?.name?.toUpperCase()}
                    </Typography>

                <div className="flex items-center gap-3 text-slate-500 text-sm">

                    <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    { blog?.createdAt && new Date(
                        blog?.createdAt
                    ).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-1">
                    <Clock3 size={14} />
                    Updated
                    </div>

                </div>
                </div>
            </div>

            <Divider sx={{ mb: 5 }} />

            {/* Content */}
            <Box
                className="prose prose-slate max-w-none"
                sx={{
                "& img": {
                    width: "100%",
                    borderRadius: "12px",
                    marginTop: "16px",
                    marginBottom: "16px",
                },

                "& h1": {
                    fontSize: "2rem",
                    fontWeight: 700,
                    marginTop: "24px",
                },

                "& h2": {
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginTop: "20px",
                },

                "& p": {
                    lineHeight: 1.9,
                    color: "#334155",
                    fontSize: "1.05rem",
                },
                }}
                dangerouslySetInnerHTML={{
                __html:blog && blog.contentHtml,
                }}
            />

            <Divider sx={{ mt: 6, mb: 4 }} />

            {/* Footer */}
            <div className="flex justify-between items-center">

                <Chip
                label="Published"
                color="success"
                />

                <Button
                variant="contained"
                onClick={() =>
                    navigate(`/blog/edit/${blog?._id}`)
                }
                sx={{
                    bgcolor: "#0d9488",
                    "&:hover": {
                    bgcolor: "#0f766e",
                    },
                    textTransform: "none",
                }}
                >
                Edit Blog
                </Button>

            </div>
            </Box>
        </Container>
        </div>
    );
}