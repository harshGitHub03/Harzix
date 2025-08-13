import Image from "next/image";
import PlanetImg from "@/public/images/planet.png";
import PlanetOverlayImg from "@/public/images/planet-overlay.svg";
import PlanetTagImg01 from "@/public/images/planet-tag-01.png";
import PlanetTagImg02 from "@/public/images/planet-tag-02.png";
import PlanetTagImg03 from "@/public/images/planet-tag-03.png";
import PlanetTagImg04 from "@/public/images/planet-tag-04.png";

export default function FeaturesPlanet() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              Harzix empowers teams with{" "}
              <span className="text-blue-500">AI-driven conversations, support, and automation</span>
            </h2>
          </div>

          {/* Planet visual */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-gradient-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,theme(colors.blue.500),transparent)]">
                <Image className="rounded-full bg-gray-900" src={PlanetImg} width={400} height={400} alt="Planet" />
                <div className="pointer-events-none" aria-hidden="true">
                  <Image className="absolute -right-64 -top-20 z-10 max-w-none" src={PlanetOverlayImg} width={789} height={755} alt="Planet decoration" />
                  <div>
                    <Image className="absolute -left-28 top-16 z-10 animate-[float_4s_ease-in-out_infinite_both] opacity-80 transition-opacity duration-500" src={PlanetTagImg01} width={253} height={56} alt="Tag 01" />
                    <Image className="absolute left-56 top-7 z-10 animate-[float_4s_ease-in-out_infinite_1s_both] opacity-30 transition-opacity duration-500" src={PlanetTagImg02} width={241} height={56} alt="Tag 02" />
                    <Image className="absolute -left-20 bottom-24 z-10 animate-[float_4s_ease-in-out_infinite_2s_both] opacity-25 transition-opacity duration-500" src={PlanetTagImg03} width={243} height={56} alt="Tag 03" />
                    <Image className="absolute bottom-32 left-64 z-10 animate-[float_4s_ease-in-out_infinite_3s_both] opacity-80 transition-opacity duration-500" src={PlanetTagImg04} width={251} height={56} alt="Tag 04" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:p-6 [&>*]:before:absolute [&>*]:before:bg-gray-800 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-gray-800 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] md:[&>*]:p-10">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"/></svg>
                <span>Real-time Conversations</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Instantly respond to customer queries and team requests using Harzix's fast, AI-powered chat engine.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M14.29 2.614a1 1 0 0 0-1.58-1.228L6.407 9.492l-3.199-3.2a1 1 0 1 0-1.414 1.415l4 4a1 1 0 0 0 1.496-.093l7-9Z"/></svg>
                <span>Custom AI Training</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Tailor Harzix to your brand by training it with your content, tone, and FAQs for hyper-relevant replies.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg>
                <span>24/7 Availability</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Let Harzix handle conversations around the clock, reducing workload and ensuring no query is missed.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M8 0a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1Z"/></svg>
                <span>Workflow Automation</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Automate repetitive tasks like booking meetings, collecting data, or routing queries—without coding.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M9 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V1Z"/></svg>
                <span>Multi-language Support</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Harzix supports multiple languages out of the box, breaking communication barriers for global teams.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M4.572 3.08a1 1 0 0 0-1.144-1.64A7.987 7.987 0 0 0 0 8a8 8 0 0 0 16 0c0-2.72-1.36-5.117-3.428-6.56"/></svg>
                <span>Seamless Integrations</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Connect Harzix with tools like Slack, CRMs, and helpdesks to centralize your communication.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
