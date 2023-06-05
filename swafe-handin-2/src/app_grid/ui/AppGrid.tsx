import styled, { css } from "styled-components";

export const AppGrid = styled.div(
  () => css`
    display: grid;
    height: 100%;
    grid-template-columns: 1fr minmax(auto, 950px) 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "navigation main";
    grid-gap: 16px;
  `
);

export const AppPageGrid = styled.div(
  () => css`
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-row-gap: 42px;
  `
);

export const AppGridNavigation = styled.div`
  grid-area: navigation;
`;

export const AppGridMain = styled.div(() => ({
  gridArea: "main",
  paddingBottom: "32px",
}));
