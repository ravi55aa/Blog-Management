import {
    Button,
    Card,
    CardContent,
    Chip,
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
    Eye,
    FileText,
    Pencil,
} from 'lucide-react';

import { useAppNavigate } from '../../hooks/useNavigate';

export default function BlogDashboard() {
    const navigate = useAppNavigate();

    const blogs = [
        {
        id: 1,
        title: 'Getting Started with React Query',
        description:
            'Learn how React Query simplifies data fetching and caching.',
        image:
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        status: 'Published',
        },
        {
        id: 2,
        title: 'Node.js Best Practices',
        description:
            'Explore the most important practices every backend developer should follow.',
        image:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        status: 'Draft',
        },
        {
        id: 3,
        title: 'Mastering MongoDB',
        description:
            'Indexes, aggregation pipelines and performance optimization.',
        image:
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
        status: 'Published',
        },
    ];

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
                Welcome Back 👋
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
            <div className="grid md:grid-cols-4 gap-5 mb-8">
            <StatCard
                title="Total Blogs"
                value="24"
                icon={<FileText size={22} />}
            />

            <StatCard
                title="Published"
                value="18"
                icon={<BookOpen size={22} />}
            />

            <StatCard
                title="Drafts"
                value="6"
                icon={<Pencil size={22} />}
            />

            <StatCard
                title="Views"
                value="14.2K"
                icon={<Eye size={22} />}
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
                onClick={() => navigate('/blogs/create')}
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

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <Card
                key={blog.id}
                elevation={0}
                sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: '0.2s',

                    '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow:
                        '0 10px 25px rgba(15, 23, 42, 0.08)',
                    },
                }}
                >
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-52 object-cover"
                />

                <CardContent>
                    <div className="flex justify-between items-center mb-3">
                    <Chip
                        label={blog.status}
                        color={
                        blog.status === 'Published'
                            ? 'success'
                            : 'warning'
                        }
                        size="small"
                    />
                    </div>

                    <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                    }}
                    >
                    {blog.title}
                    </Typography>

                    <Typography
                    sx={{
                        color: '#64748b',
                        mb: 3,
                    }}
                    >
                    {blog.description}
                    </Typography>

                    <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                        navigate(`/blogs/${blog.id}`)
                        }
                    >
                        View
                    </Button>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() =>
                        navigate(`/blogs/edit/${blog.id}`)
                        }
                        sx={{
                        bgcolor: '#0d9488',
                        '&:hover': {
                            bgcolor: '#0f766e',
                        },
                        }}
                    >
                        Edit
                    </Button>
                    </div>
                </CardContent>
                </Card>
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