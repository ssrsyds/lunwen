import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host)
  },[])

  return (
    <footer>
      {/* <div>
        Powered by{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          OpenAI{" "}
        </a>
        and{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel Edge Functions.
        </a>
      </div> */}
      
    </footer>
  );
}
