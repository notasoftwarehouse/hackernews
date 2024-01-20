import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Input } from "./ui/input";

function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Popover.Button as={"a"} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-gray-800 p-4 text-lg tracking-tight text-white shadow-xl"
          >
            <MobileNavLink href="#new">New</MobileNavLink>
            <MobileNavLink href="#past">Past</MobileNavLink>
            <MobileNavLink href="#showhn">Show</MobileNavLink>
            <MobileNavLink href="#askhn">Ask</MobileNavLink>
            <MobileNavLink href="#jobs">Jobs</MobileNavLink>
            {/* <hr className="m-2 border-slate-300/40" /> */}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export default function Header() {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a href="/" aria-label="Home">
              <h1 className="font-bold text-xl">Hacker News</h1>
            </a>
            <div className="hidden md:flex md:gap-x-6">
              <a href="#new">new</a>
              <a href="#past">past</a>
              <a href="#showhn">show</a>
              <a href="#askhn">ask</a>
              <a href="#jobs">jobs</a>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className=" ">
              <Input
                type="search"
                placeholder="Search..."
                className="hidden sm:block md:w-[100px] lg:w-[300px] bg-gray-900"
              />
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
