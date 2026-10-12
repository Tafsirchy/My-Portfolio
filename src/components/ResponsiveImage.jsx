import manifest from '@/data/imageManifest.json';

/**
 * Renders a <picture> with a WebP <source srcSet> (generated from the shared
 * image manifest) and the original asset as a fallback <img>.
 *
 * The wrapper uses `display: contents` so the inner <img> participates in the
 * parent layout exactly as a bare <img> would (no extra box, no layout shift).
 */
const ResponsiveImage = ({ src, alt, sizes = '100vw', className, ...rest }) => {
  const meta = manifest[src];
  const srcSet = meta
    ? meta.variants.map((v) => `${v.url} ${v.w}w`).join(', ')
    : undefined;

  return (
    <picture className="contents">
      {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img src={src} alt={alt} className={className} {...rest} />
    </picture>
  );
};

export default ResponsiveImage;
