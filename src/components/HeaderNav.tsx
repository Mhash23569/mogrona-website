'use client';

import Form from 'next/form';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { href } from '@/lib/format';
import { SearchIcon } from './icons';

type NavLink = { href: string; label: string };

export function HeaderNav({ productLinks, categoryLinks, cta }: { productLinks: NavLink[]; categoryLinks: NavLink[]; cta: ReactNode }) {
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close the mobile menu and search box whenever the page changes.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Close the search box when clicking anywhere else.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const active = (...prefixes: string[]) =>
    prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ? 'is-active' : undefined;

  return (
    <>
      <button
        className="burger"
        type="button"
        aria-label="Menu"
        aria-expanded={menuOpen}
        aria-controls="nav"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`nav${menuOpen ? ' open' : ''}`} id="nav" aria-label="Main menu">
        <ul className="nav__list">
          <li className="has-sub">
            <Link href={href.products} className={active(href.products)}>
              Products
            </Link>
            <ul className="sub">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href={href.products}>All products</Link>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <Link href={href.recipes} className={active(href.recipes)}>
              Recipes
            </Link>
            <ul className="sub">
              {categoryLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href={href.recipes}>All recipes</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href={href.where} className={active(href.where)}>
              Where to Buy
            </Link>
          </li>
          <li>
            <Link href={href.health} className={active(href.health)}>
              Health
            </Link>
          </li>
          <li>
            <Link href={href.story} className={active(href.story)}>
              Our Story
            </Link>
          </li>
          <li>
            <Link href={href.blog} className={active(href.blog)}>
              Blog
            </Link>
          </li>
          <li>
            <Link href={href.faq} className={active(href.faq)}>
              FAQ
            </Link>
          </li>
          <li className="nav__search" ref={searchRef}>
            <button
              className="icon-btn"
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((o) => {
                  if (!o) setTimeout(() => inputRef.current?.focus(), 0);
                  return !o;
                });
              }}
            >
              <SearchIcon />
            </button>
            <Form className={`search${searchOpen ? ' open' : ''}`} action={href.search} role="search">
              <input ref={inputRef} type="search" name="q" placeholder="Search the site" aria-label="Search the site" required />
              <button className="btn btn--green btn--sm" type="submit">
                Go
              </button>
            </Form>
          </li>
          <li className="nav__cta">{cta}</li>
        </ul>
      </nav>
    </>
  );
}
