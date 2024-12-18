const FunnelBrand = () => {
  return (
    <div>
      <h1
        className={`
            font-plus_jakarta_sans_bold
            text-[32px]
            sm:text-3xl 
            lg:text-[32px] 
            leading-[1.2]
            tracking-[-0.5px] 
            mb-4
            sm:mb-5
            max-w-[800px]
            mx-auto
          `}
      >
        Turn Your Fans Into Brand Deals—Automatically.
      </h1>
      <p
        className="
            text-gray-400 
            text-lg 
            sm:text-xl 
            mb-8 
            sm:mb-10 
            max-w-[600px] 
            mx-auto 
            px-6
            sm:px-2
            leading-relaxed
            sm:leading-normal
            font-plus_jakarta_sans
          "
      >
        <span className="sm:hidden">
          Our AI agents analyze your followers, uncover brand opportunities, and
          deliver actionable insights—24/7.
        </span>
        <span className="hidden sm:block">
          Our AI agents analyze your followers, uncover brand
          <br />
          opportunities, and deliver actionable insights—24/7.
        </span>
      </p>
    </div>
  );
};

export default FunnelBrand;
