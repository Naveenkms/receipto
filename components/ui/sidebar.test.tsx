import { render, screen } from "@testing-library/react";
import { UserIcon } from "lucide-react";

import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";

const label = "label";
const iconTestId = "user-icon";

const sidebarLink = (
  <Sidebar animate={false}>
    <SidebarBody>
      <SidebarLink
        link={{
          label,
          href: "#",
          icon: (
            <UserIcon
              data-testid={iconTestId}
              className="h-5 w-5 shrink-0 rounded-full text-neutral-700 dark:text-neutral-200"
            />
          ),
        }}
      />
    </SidebarBody>
  </Sidebar>
);

describe("<SidebarLink />", () => {
  it("to show the label", () => {
    render(sidebarLink);

    // shows two links : one for mobile and another for desktop
    const elements = screen.getAllByText(label);

    expect(elements).toHaveLength(2);

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("to show the icon", () => {
    render(sidebarLink);

    const element = screen.getAllByTestId(iconTestId);
    expect(element).toHaveLength(2);

    element.forEach((icon) => {
      expect(icon).toBeInTheDocument();
    });
  });
});
