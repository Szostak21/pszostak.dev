import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ConversationalHero } from "@/components/hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Other from "@/sections/Other";
import { siteConfig } from "@/data/config";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>{`${siteConfig.name} | ${siteConfig.title}`}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ConversationalHero />
        <Projects />
        <Skills />
        <About />
        <Other />
      </main>
    </>
  );
}
