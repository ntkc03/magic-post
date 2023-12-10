
function HomePage() {
  
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div className="items-center justify-center bg-background text-center text-textColor">
        <h1 className="text-4xl sm:text-8xl">Magic derives from <br /> sustainable service</h1>
        <p className="mx-4 sm:text-xl">MagicPost cung cấp dịch vụ ổn định và bền bỉ, đáp ứng nhu cầu <br className="hidden sm:block" /> vận chuyển hàng hóa nội địa và quốc tế tại Việt Nam.<br /><br /></p>
        <div className="mb-0">
          <button className="rounded-md p-2 bg-buttonbg hover:underline text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <a href = "">Tra cứu</a>
          </button>
        
      
      <img
        src="https://i.imgur.com/Jrvywgo.png"
        alt="Img"
        className=""
      />
      </div>
      </div>
    </div>
  );
}

export default HomePage;