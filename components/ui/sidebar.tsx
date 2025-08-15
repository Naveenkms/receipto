"use client";
import React, { useState, createContext, useContext, Component } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Label = string;
type Icon = React.JSX.Element | React.ReactNode;

interface Links {
  label: Label;
  href: string;
  icon: Icon;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const AnimateTextOnSidebarOpen = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open, animate } = useSidebar();

  return (
    <motion.span
      animate={{
        display: animate ? (open ? "inline-block" : "none") : "inline-block",
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

const sidebarButtonClasses =
  "flex items-center justify-start gap-2  group/sidebar py-2 cursor-pointer";
const sidebarButtonTextClasses =
  "text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0";

export const SidebarButton = ({
  className,
  content,
  onClick,
}: {
  className?: string;
  content: { label: Label; icon: Icon };
  onClick?: React.ComponentProps<"button">["onClick"];
}) => {
  return (
    <button onClick={onClick} className={cn(sidebarButtonClasses, className)}>
      {content.icon}
      <AnimateTextOnSidebarOpen className={sidebarButtonTextClasses}>
        {content.label}
      </AnimateTextOnSidebarOpen>
    </button>
  );
};

export const SidebarLink = ({
  link,
  className,
}: {
  link: Links;
  className?: string;
}) => {
  const pathname = usePathname();
  const { open, setOpen } = useSidebar();

  return (
    <>
      <Link
        href={link.href}
        className={cn(
          sidebarButtonClasses,
          pathname === link.href ? "[&>svg]:text-primary " : "",
          "hidden md:flex",
          className
        )}
      >
        {link.icon}

        <AnimateTextOnSidebarOpen
          className={cn(
            sidebarButtonTextClasses,
            pathname === link.href ? "text-primary font-semibold" : ""
          )}
        >
          {link.label}
        </AnimateTextOnSidebarOpen>
      </Link>
      <Link
        onClick={() => setOpen(!open)}
        href={link.href}
        className={cn(
          sidebarButtonClasses,
          pathname === link.href ? "[&>svg]:text-primary " : "",
          "md:hidden",
          className
        )}
      >
        {link.icon}

        <AnimateTextOnSidebarOpen
          className={cn(
            sidebarButtonTextClasses,
            pathname === link.href ? "text-primary font-semibold" : ""
          )}
        >
          {link.label}
        </AnimateTextOnSidebarOpen>
      </Link>
    </>
  );
};

export const SidebarLogo = ({ className }: { className?: string }) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center py-1 text-2xl font-bold whitespace-pre text-black dark:text-white"
    >
      R
      {open || !animate ? (
        <motion.span
          initial={{ opacity: animate ? 0 : 1 }}
          animate={{ opacity: 1 }}
        >
          eciepto
        </motion.span>
      ) : null}
    </Link>
  );
};
