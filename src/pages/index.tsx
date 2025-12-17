import Head from "next/head";
import { ConversationalHero } from "@/components/hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import { siteConfig } from "@/data/config";

export default function Home() {
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
        <Contact />
      </main>
    </>
  );
}
