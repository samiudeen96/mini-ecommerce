const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="bg-blue-950 p-3">
        <div className="container flex justify-center">
          <div className="logo flex gap-1 items-center">
            <div>
              <img src="/images/footerLogo.svg" alt="" />
            </div>
            <div className="text-white text-sm">Shopping - {currentYear}, all rights reserved</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
