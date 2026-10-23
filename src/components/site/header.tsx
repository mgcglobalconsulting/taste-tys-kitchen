"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { nav, primaryCta, site, type NavItem } from "@/content/site";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Skip the "All …" link when a child already points at the section root. */
function hasOverview(item: NavItem): boolean {
  return !item.children?.some((child) => child.href === item.href);
}

function UtilityBar() {
  return (
    <div className="bg-ink text-creme">
      <div className="container-site flex h-9 items-center justify-between text-xs tracking-wide">
        <p className="hidden text-creme/80 sm:block">
          {site.descriptor} · {site.base}
        </p>
        <div className="flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-end">
          <a href={site.contact.phoneHref} className="inline-flex items-center gap-1.5 hover:text-gold">
            <Phone className="size-3.5" aria-hidden />
            {site.contact.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex items-center gap-1.5 hover:text-gold"
          >
            <Mail className="size-3.5" aria-hidden />
            {site.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu.Root className="relative hidden lg:flex" delayDuration={100}>
      <NavigationMenu.List className="flex items-center gap-1">
        {nav.map((item) => (
          <NavigationMenu.Item key={item.label}>
            {item.children ? (
              <>
                <NavigationMenu.Trigger
                  className={cn(
                    "group inline-flex h-10 items-center gap-1 px-3 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:text-pinot data-[state=open]:text-pinot",
                    isActive(pathname, item) && "text-pinot",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>

                {/* Content lives inside the shared Viewport below */}
                <NavigationMenu.Content>
                  <ul className="w-[22rem] p-2">
                    {hasOverview(item) ? (
                      <li>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={item.href}
                            className="block rounded-[var(--radius-control)] px-4 py-3 transition-colors hover:bg-linen"
                          >
                            <span className="eyebrow text-[0.6875rem]">Overview</span>
                            <span className="mt-1 block font-display text-lg leading-tight text-ink">
                              All {item.label.toLowerCase()}
                            </span>
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ) : null}
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={child.href}
                            className="nav-dropdown-item block rounded-[var(--radius-control)] px-4 py-3 transition-colors hover:bg-linen"
                          >
                            <span className="block font-display text-lg leading-tight text-ink">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="mt-1 block text-sm leading-snug text-smoke">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link asChild active={isActive(pathname, item)}>
                <Link
                  href={item.href}
                  className="inline-flex h-10 items-center px-3 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:text-pinot data-[active]:text-pinot"
                >
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* Single animated viewport — renders whichever Content is active */}
      <div className="absolute left-0 top-full z-50 flex w-full justify-center pt-2">
        <NavigationMenu.Viewport className="nav-viewport" />
      </div>
    </NavigationMenu.Root>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center text-ink lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-creme shadow-xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <Dialog.Title className="eyebrow">Menu</Dialog.Title>
            <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center text-ink"
                aria-label="Close menu"
              >
                <X className="size-6" aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-2" aria-label="Mobile">
            <Accordion.Root type="single" collapsible>
              {nav.map((item) =>
                item.children ? (
                  <Accordion.Item key={item.label} value={item.label} className="border-b border-line">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between py-4 font-display text-2xl text-ink">
                        {item.label}
                        <ChevronDown
                          className="size-5 text-pinot transition-transform duration-200 group-data-[state=open]:rotate-180"
                          aria-hidden
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion-content pb-4">
                      <ul className="space-y-1 border-l-2 border-pinot pl-4">
                        {hasOverview(item) ? (
                          <li>
                            <Link href={item.href} onClick={close} className="block py-2 text-smoke hover:text-pinot">
                              All {item.label.toLowerCase()}
                            </Link>
                          </li>
                        ) : null}
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              className="block py-2 text-ink hover:text-pinot"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ) : (
                  <div key={item.label} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-4 font-display text-2xl text-ink hover:text-pinot"
                    >
                      {item.label}
                    </Link>
                  </div>
                ),
              )}
            </Accordion.Root>
          </nav>
          <div className="space-y-3 border-t border-line p-4">
            <Button asChild size="lg" className="w-full">
              <Link href={primaryCta.href} onClick={close}>
                {primaryCta.label}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <a href={site.contact.phoneHref}>Call {site.contact.phoneDisplay}</a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <UtilityBar />
      <div className="border-b border-line bg-creme/95 backdrop-blur supports-[backdrop-filter]:bg-creme/85">
        <div className="container-site flex h-20 items-center justify-between gap-6">
          <Logo className="w-[84px] sm:w-[92px]" />
          <DesktopNav pathname={pathname} />
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
