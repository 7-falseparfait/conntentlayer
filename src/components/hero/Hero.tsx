import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-[700px] w-full rounded-md">
      <Image
        src="/Hero-img.jpg"
        alt="hero"
        fill
        className="object-cover rounded-md"
        priority
      />
    </div>
  );
};

export default Hero;
