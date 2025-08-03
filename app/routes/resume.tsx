import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
  { title: 'OptiCV | Review ' },
  { name: 'description', content: 'Detailed overview of your resume' },
]);

// Helper to ensure feedback is always in expected shape
function normalizeFeedback(feedback: any): Feedback {
  return {
    overallScore: feedback.overallScore ?? feedback.overall_score ?? 0,
    ATS: feedback.ATS ?? feedback.ats ?? { score: 0, tips: [] },
    toneAndStyle: feedback.toneAndStyle ?? feedback.tone_and_style ?? { score: 0, tips: [] },
    content: feedback.content ?? { score: 0, tips: [] },
    structure: feedback.structure ?? { score: 0, tips: [] },
    skills: feedback.skills ?? { score: 0, tips: [] },
  };
}

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading, auth.isAuthenticated, id, navigate]);

  useEffect(() => {
    const loadResume = async () => {
      const resumeStr = await kv.get(`resume:${id}`);
      if (!resumeStr) {
        console.warn(`No resume found for id ${id}`);
        return;
      }

      try {
        const data = JSON.parse(resumeStr);
        console.log('Loaded resume data:', data);

        if (!data.feedback) {
          console.warn(`No feedback in loaded data for id ${id}`);
          return;
        }

        const normalized = normalizeFeedback(data.feedback);

        if (!normalized.ATS || typeof normalized.ATS.score !== 'number') {
          console.warn(`No valid ATS feedback in loaded data for id ${id}`);
        }

        if (data.resumePath) {
          const resumeBlob = await fs.read(data.resumePath);
          if (resumeBlob) {
            const url = URL.createObjectURL(resumeBlob);
            setResumeUrl(url);
          }
        }

        if (data.imagePath) {
          const imageBlob = await fs.read(data.imagePath);
          if (imageBlob) {
            const url = URL.createObjectURL(imageBlob);
            setImageUrl(url);
          }
        }

        setFeedback(normalized);
      } catch (e) {
        console.error('Failed to parse resume data:', e);
      }
    };

    loadResume();
  }, [id, fs, kv]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-greeng.png')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">

              <Summary feedback={feedback} />

              {feedback.ATS && typeof feedback.ATS.score === "number" && Array.isArray(feedback.ATS.tips) ? (
                <ATS
                  score={feedback.ATS.score}
                  suggestions={feedback.ATS.tips}
                />
              ) : (
                <p className="text-sm text-red-500">
                  ATS feedback is not available.
                </p>
              )}

              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;


