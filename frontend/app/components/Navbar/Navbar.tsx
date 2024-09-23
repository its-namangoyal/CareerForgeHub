/* eslint-disable react-hooks/rules-of-hooks */
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import Logout from "./Logout";
import AddSkill from "./AddSkills";
import { useRecommendations } from "../../RecommendationContext"; // Adjust the path as necessary

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "#/", current: true },
  { name: 'Recommendation', href: '#testimonial', current: false },
  { name: "Courses", href: "#courses", current: false },
  { name: "Team", href: "#mentor", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} passHref>
      <span onClick={onClick} className="px-3 py-4 text-lg font-normal">
        {children}
      </span>
    </Link>
  );
};

// { name: 'Recommendation', href: '#testimonial', current: false },
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("/");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // const [itemsOfNav, setItemsOfNav] = useState(navigation);
  const [apiCalled, setApiCalled] = useState(false);
  const { fetchDataFromAPI } = useRecommendations();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleLinkClick = (href: string) => {
    setCurrentLink(href);
  };

  const handleAddSkill = async (skills: any, education: any) => {
    fetchDataFromAPI(skills, education)
      .then(() => {
        setApiCalled(true)
      })
      .catch((error: any) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-12 w-40 lg:hidden"
                  src={"/assets/logo/CFH_logo.png"}
                  alt="dsign-logo"
                />
                <img
                  className="hidden h-full w-full lg:block"
                  src={"/assets/logo/CFH_logo.png"}
                  alt="dsign-logo"
                />
              </div>

              <div className="hidden lg:block m-auto">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      <span
                        className={classNames(
                          item.href === currentLink
                            ? "underline-links"
                            : "text-slategray",
                          "px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100"
                        )}
                        aria-current={item.href ? "page" : undefined}
                      >
                        {item.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>

            {!isUserLoggedIn ? (
              <>
                <Signdialog
                  setLoggedInStatus={setIsUserLoggedIn}
                  isUserLoggedIn={isUserLoggedIn}
                />
                <Registerdialog
                  setLoggedInStatus={setIsUserLoggedIn}
                  isUserLoggedIn={isUserLoggedIn}
                />
              </>
            ) : (
              <>
                <Logout />
                <AddSkill handleSkills={handleAddSkill} />
              </>
            )}

            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
