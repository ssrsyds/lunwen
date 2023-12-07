import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host)
  },[])

  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
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
      <div>
        <Link href="" target="_blank">©Ai智能答题助手</Link>
        {host && ['zhoubaotong.com', 'zhoubaotong.cn'].includes(host) && (
          <>
            <label className="px-2">|</label>
            <Link href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">皖ICP备2023001879号</Link>
          </>
        )}
      </div>
      <div className="flex space-x-4 pb-4 sm:pb-0">
        <Link
          target="_blank"
          href="https://sc.lzlspyxgs.asia/new/"
          className="group"
          aria-label="TaxPal on GitHub"
        >
          <svg t="1701930530207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13450" width="25" height="25"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z m62.9-219.5c-18.5 7.1-30.9 25.1-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z" fill="#1296DB" p-id="13451"></path></svg>
        </Link>
      </div>
    </footer>
  );
}
