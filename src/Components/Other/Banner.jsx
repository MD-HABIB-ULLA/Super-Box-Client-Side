

const Banner = () => {
  return (
    <>
   <section className="overflow-hidden bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">
              Empower Your Business with an All-in-One Digital and Growth Platform
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Take control of your business operations, streamline workflows, and scale your brand—both online and offline. Get the tools you need to thrive in the digital world and beyond.
            </p>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Your Partner for Business Growth
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                From secure payments and delivery management to invoicing, sales tracking, and business consulting, our platform is designed to help you succeed in today's competitive market, whether you're expanding online or enhancing your physical presence.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Let's get started
              </a>
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get access
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573164713619-24c711fe7878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
                alt="Business growth illustration showing a person working on a laptop"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Banner;
