import { Button, Card, CardContent, Typography, Container, Chip } from '@mui/material';
import { Image as ImageIcon, LayoutDashboard, ArrowRight, BookOpen, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { useAppNavigate } from '../../hooks/useNavigate';

export default function App() {

    const navigate=useAppNavigate();
    
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-200">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-teal-600 p-2 rounded-lg text-white">
                    <BookOpen size={24} />
                </div>
                <span className="text-2xl font-bold bg-linear-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                    Boggy
                </span>
                </div>
                <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-teal-600 transition-colors">How it Works</a>
                <a href="#testimonials" className="hover:text-teal-600 transition-colors">Testimonials</a>
                </div>
                <div className="flex items-center gap-4">
                
                <Button 
                
                    onClick={()=>navigate("/login")}
                    variant="text" sx={{ color: '#0f766e', textTransform: 'none', fontWeight: 600 }}>
                    Sign In
                </Button>

                <Button 
                    onClick={()=>navigate("/register")}
                    variant="contained" 
                    disableElevation
                    sx={{ 
                    bgcolor: '#0d9488', 
                    '&:hover': { bgcolor: '#0f766e' },
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px'
                    }}
                >
                    Get Started
                </Button>

                </div>
            </div>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:16px_16px] [mask-[linear-gradient(to_bottom,white,transparent)] -z-10"></div>
            <Container maxWidth="lg">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left space-y-8">
                <Chip 
                    icon={<Sparkles size={16} className="text-teal-600" />} 
                    label="Boggy v1.0 is now live!" 
                    variant="outlined" 
                    sx={{ borderColor: '#ccfbf1', bgcolor: '#f0fdfa', color: '#0f766e', fontWeight: 500 }}
                />
                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Manage your blogs <br className="hidden lg:block"/>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-500">
                    beautifully.
                    </span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Boggy is the lightweight, lightning-fast blog management system. 
                    Write captivating titles, craft rich descriptions, and effortlessly upload images to share your story with the world.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button 
                    variant="contained" 
                    size="large"
                    disableElevation
                    endIcon={<ArrowRight size={20} />}
                    sx={{ 
                        bgcolor: '#0d9488', 
                        '&:hover': { bgcolor: '#0f766e' },
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '8px',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem'
                    }}
                    >
                    Start Writing Free
                    </Button>
                    <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                        borderColor: '#cbd5e1',
                        color: '#475569',
                        '&:hover': { borderColor: '#94a3b8', bgcolor: '#f8fafc' },
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '8px',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem'
                    }}
                    >
                    Live Demo
                    </Button>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 pt-4">
                    <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-teal-500"/> No credit card required</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-teal-500"/> 14-day free trial</div>
                </div>
                </div>
                
                {/* Dashboard Mockup */}
                <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                <div className="absolute -inset-1 bg-linear-to-r from-teal-500 to-emerald-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="mx-auto bg-white border border-slate-200 text-xs text-slate-400 px-8 py-1 rounded-md font-mono">
                        app.boggy.com/editor
                    </div>
                    </div>
                    <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Post Title</div>
                        <div className="h-10 bg-slate-100 rounded-md w-full border border-slate-200 flex items-center px-4 text-slate-600 font-medium">
                        My Awesome Journey with Boggy
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cover Image</div>
                        <div className="h-32 border-2 border-dashed border-slate-200 rounded-md bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                        <ImageIcon size={32} className="text-teal-400" />
                        <span className="text-sm font-medium">Click to upload image</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</div>
                        <div className="h-24 bg-slate-100 rounded-md w-full border border-slate-200 p-4 text-slate-600 text-sm">
                        Starting a new blog has never been easier. With Boggy, I can manage all my content in one simple, beautiful interface...
                        </div>
                    </div>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        disableElevation
                        sx={{ bgcolor: '#0f766e', '&:hover': { bgcolor: '#115e59' }, textTransform: 'none', fontWeight: 600 }}
                    >
                        Publish Post
                    </Button>
                    </div>
                </div>
                </div>
            </div>
            </Container>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white border-y border-slate-100">
            <Container maxWidth="lg">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run a blog</h2>
                <p className="text-lg text-slate-600">Boggy strips away the complexity, leaving you with exactly what you need to create and manage your content effectively.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <Card elevation={0} sx={{ border: '1px solid #f1f5f9', borderRadius: '16px', transition: 'all 0.2s', '&:hover': { borderColor: '#ccfbf1', boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.1)' } }}>
                <CardContent sx={{ p: 4 }}>
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 text-teal-600">
                    <FileText size={24} />
                    </div>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>
                    Clean Text Editor
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                    Focus on what matters: your content. Write compelling titles and engaging descriptions with our distraction-free, intuitive interface.
                    </Typography>
                </CardContent>
                </Card>

                <Card elevation={0} sx={{ border: '1px solid #f1f5f9', borderRadius: '16px', transition: 'all 0.2s', '&:hover': { borderColor: '#ccfbf1', boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.1)' } }}>
                <CardContent sx={{ p: 4 }}>
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                    <ImageIcon size={24} />
                    </div>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>
                    Rich Media Uploads
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                    A picture is worth a thousand words. Drag, drop, and seamlessly upload beautiful images to complement your blog descriptions.
                    </Typography>
                </CardContent>
                </Card>

                <Card elevation={0} sx={{ border: '1px solid #f1f5f9', borderRadius: '16px', transition: 'all 0.2s', '&:hover': { borderColor: '#ccfbf1', boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.1)' } }}>
                <CardContent sx={{ p: 4 }}>
                    <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-6 text-cyan-600">
                    <LayoutDashboard size={24} />
                    </div>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>
                    Centralized Dashboard
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                    Manage all your posts from one central hub. Edit, delete, or review your published content with a few simple clicks.
                    </Typography>
                </CardContent>
                </Card>
            </div>
            </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-teal-900"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your Boggy journey?</h2>
            <p className="text-teal-100 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of writers who have simplified their blog management workflow. Create your account today and publish your first post in minutes.
            </p>
            <Button 
                variant="contained" 
                size="large"
                disableElevation
                sx={{ 
                bgcolor: 'white', 
                color: '#0f766e',
                '&:hover': { bgcolor: '#f0fdfa' },
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '8px',
                px: 6,
                py: 2,
                fontSize: '1.1rem'
                }}
            >
                Create Your Free Account
            </Button>
            </Container>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
            <Container maxWidth="lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-teal-500" />
                <span className="text-xl font-bold text-white tracking-tight">Boggy</span>
                </div>
                <div className="flex space-x-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
                <p className="text-sm">
                &copy; {new Date().getFullYear()} Boggy. All rights reserved.
                </p>
            </div>
            </Container>
        </footer>
        </div>
    );
}