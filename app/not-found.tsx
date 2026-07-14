import Button from "@/components/Button";
import PixelCloud from "@/components/PixelCloud";
import { PROJECTS_HREF } from "@/lib/coros";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-center justify-center py-section text-center">
      {/* One lonely cloud, gently bobbing */}
      <PixelCloud shape="puff" variant="pink" size={110} className="cloud-bob" />
      <p className="text-style-eyebrow mt-10 text-accent-deep">404</p>
      <h1 className="mt-4 max-w-xl font-display text-h1 font-semibold text-ink">
        This page drifted away.
      </h1>
      <p className="mt-4 max-w-md text-body-lg text-ink-muted">
        Whatever was here has floated off into the sky. Let&rsquo;s get you somewhere
        with more clouds.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/">Back home</Button>
        <Button href={PROJECTS_HREF} variant="secondary">
          See my work
        </Button>
      </div>
    </section>
  );
}
