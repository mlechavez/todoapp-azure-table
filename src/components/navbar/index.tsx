import React from "react";
import { Container, Heading, MenuItem, ThemeWrapper, Wrapper } from "./styles";
import { menuList } from "./menu";
import { NavLink } from "react-router-dom";
import { useAppTheme } from "../../hooks/useAppTheme";
import Counter from "./Counter";

const Navbar = () => {
  const { inputThemeRef, setThemeColor, themeColor } = useAppTheme();

  return (
    <Container>
      <Heading>Todo App</Heading>
      <Wrapper>
        {menuList.map((menu, index) => (
          <MenuItem
            key={`${menu.name}-${index}`}
            display="flex"
            flexDirection="column"
          >
            <NavLink activeClassName="active" exact to={`${menu.to}`}>
              {menu.Icon()}
              <span className="menu-name">{menu.name}</span>
              <Counter name={menu.name} />
            </NavLink>
          </MenuItem>
        ))}
      </Wrapper>
      <ThemeWrapper>
        <p>
          Choose theme:{" "}
          <input
            type="color"
            onChange={(e) => setThemeColor(e.target.value)}
            ref={inputThemeRef}
            value={themeColor}
          />
        </p>
      </ThemeWrapper>
    </Container>
  );
};

export default Navbar;
