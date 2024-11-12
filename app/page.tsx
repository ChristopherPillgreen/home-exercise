"use client";

export default function Open() {
  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                  <img alt="" src="logo.png" className="h-20 w-auto" />
                  <p className="mt-4 text-xl text-gray-500">Create and send exercise routines with ease</p>
              </div>
              <div>
                  <div className="mt-10">
                      <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                          <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                              <div className="flex items-center space-x-6 lg:space-x-8">
                                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                          <img src="exercises_home/exercise_1.jpg" alt="" className="h-full w-full object-cover object-center"/>
                                      </div>
                                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                                          <img src="exercises_home/exercise_2.jpg" alt="" className="h-full w-full object-cover object-center"/>
                                      </div>
                                  </div>
                                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                                          <img src="exercises_home/exercise_3.jpg" alt="" className="h-full w-full object-cover object-center"/>
                                      </div>
                                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                                          <img src="exercises_home/exercise_4.jpg" alt="" className="h-full w-full object-cover object-center"/>
                                      </div>
                                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                                          <img src="exercises_home/exercise_5.jpg" alt="" className="h-full w-full object-cover object-center"/>
                                      </div>
                                  </div>
                                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                                          <img src="exercises_home/exercise_6.jpg" alt="" className="h-full w-full object-cover object-center"/>
                                      </div>
                                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                                          <img src="exercises_home/exercise_7.jpg" alt="" className="h-full w-full object-cover object-center"/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <a href="/confirm" className="inline-block rounded-md border border-transparent px-8 py-3 text-center font-medium text-white hover:bg-indigo-700" style={{ backgroundColor: '#7076af' }}>Enter</a>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
