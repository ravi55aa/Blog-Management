import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
    Avatar,
    InputAdornment, 
} from '@mui/material';

import {
    BookOpen,
    Plus,
    Search,
    FileText,
    Pencil,
} from 'lucide-react';

import { useAppNavigate } from '../../hooks/useNavigate';
import type { IDBBlog } from '../../Interface/IBlog';
import { useEffect, useState } from 'react';
import { BlogService } from '../../api/Services/BlogService';
import { BlogCard } from '../../components/BlogCard';


export default function BlogDashboard() {
    
    const navigate = useAppNavigate();
    const [myBlogs,setMyBlogs]=useState<IDBBlog[]>([]);
    const [allBlogs,setAllBlogs]=useState<IDBBlog[]>([]);

    const handleFetchCurrentUserBlogs = async () => {
        const res=await BlogService.getMyBlogs();

        if(!res.success){
            console.log(res.success);
            return res.success;
        }

        if(res.data){
            setMyBlogs(res.data);
        }
        
        console.log('@dashboard myBlogs',myBlogs)
        return res.success;
    };

    const handleFetchAllBlogs = async() => {
        const res=await BlogService.getAllBlogs();

        if(!res.success){
            console.log(res.success);
            return res.success;
        }

        if(res.data){
            setAllBlogs(res.data);
        }

        console.log('allBlogs',communityBlogs)
        return res.success;
    }

    useEffect(()=>{
        (async()=>{
            await handleFetchCurrentUserBlogs();
            await handleFetchAllBlogs();
        })()
    },[]);

    // const myBlogs = blogs.filter(
    // blog => blog.userId === currentUserId
    // );

    const communityBlogs = allBlogs.filter(
    blog => blog.userId !== myBlogs[0]?.userId
    );


    return (
        <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <Container maxWidth="xl">
                <div className="h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="bg-teal-600 text-white p-2 rounded-lg">
                        <BookOpen size={22} />
                    </div>

                    <div>
                        <h1 className="font-bold text-xl text-slate-900">
                        Boggy Dashboard
                        </h1>
                    </div>
                    </div>

                    <Avatar
                    sx={{
                        bgcolor: '#0d9488',
                    }}
                    >
                    R
                    </Avatar>
                </div>
            </Container>
        </header>

        <Container maxWidth="xl" className="py-8">
            {/* Welcome */}
            <div className="mb-8">
            <Typography
                variant="h4"
                sx={{
                fontWeight: 700,
                color: '#0f172a',
                }}
            >
                Welcome Back 
            </Typography>

            <Typography
                sx={{
                color: '#64748b',
                mt: 1,
                }}
            >
                Manage your blogs and publish new content.
            </Typography>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 items-center gap-5 mb-8">
            <StatCard
                title="Total Blogs"
                value={allBlogs?.length.toString()}
                icon={<FileText size={22} />}
                />

                <StatCard
                title="My Blogs"
                value={myBlogs?.length.toString()}
                icon={<Pencil size={22} />}
                />

                <StatCard
                title="Community Blogs"
                value={communityBlogs?.length.toString()}
                icon={<BookOpen size={22} />}
                />
            </div>

            {/* Search & Create */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
            <TextField
            fullWidth
            placeholder="Search blogs..."
            slotProps={{
                input: {
                startAdornment: (
                    <InputAdornment position="start">
                    <Search size={18} />
                    </InputAdornment>
                ),
                },
            }}
            />

            <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => navigate('/blog/create')}
                sx={{
                bgcolor: '#0d9488',
                '&:hover': {
                    bgcolor: '#0f766e',
                },
                minWidth: '220px',
                textTransform: 'none',
                fontWeight: 600,
                }}
            >
                Create New Blog
            </Button>
            </div>

            {/*My Blog Grid */}
            <div className="flex justify-between items-center mb-6">

            <Typography
                variant="h5"
                sx={{
                fontWeight: 700,
                }}
            >
                My Blogs
            </Typography>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {myBlogs?.map(blog => (
                <BlogCard
                IsMyBlog={true}
                key={blog._id}
                blog={blog}
                />
            ))}
            </div>


            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {communityBlogs?.map((blog) => (
                <BlogCard key={blog._id} IsMyBlog={false} blog={blog} />
            ))}
            </div>
        </Container>
        </div>
    );
    }



type StatCardProps = {
    title: string;
    value: string;
    icon: React.ReactNode;
};



function StatCard({
        title,
        value,
        icon,
    }: StatCardProps) {
    return (
        <Card
        elevation={0}
        sx={{
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
        }}
        >
        <CardContent>
            <div className="flex justify-between items-center">
            <div>
                <Typography
                sx={{
                    color: '#64748b',
                    fontSize: '14px',
                }}
                >
                {title}
                </Typography>

                <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mt: 1,
                }}
                >
                {value}
                </Typography>
            </div>

            <div className="bg-teal-50 text-teal-600 p-3 rounded-xl">
                {icon}
            </div>
            </div>
        </CardContent>
        </Card>
    );
}
