import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constants/index";
import { callbackify } from "util";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OptiCV" },
    { name: "description", content: "OptiCV is an AI-powered cv builder and analyzer that helps you create, optimize, and tailor job-winning CVs for any role" },
  ];
}

export default function Home() {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next')[1];
    const navigate = useNavigate();


    // useEffect(() => {
    //     if(!auth.isAuthenticated) navigate('/auth?next=/');
    // }, [auth.isAuthenticated])
    useEffect(() => {
      if (!isLoading && !auth.isAuthenticated) {
        navigate("/auth?next=/");
      }
    }, [isLoading, auth.isAuthenticated]);


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    
    <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback</h2>
        </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume}/>
          ))}
      </div>  
      
      )}
    </section>
  </main>
}
