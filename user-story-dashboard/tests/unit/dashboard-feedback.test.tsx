import { render,screen } from "@testing-library/react";
import { describe,it,expect } from "vitest";
import { EmptyState,ErrorView } from "../../src/components/feedback/Feedback";
describe("dashboard feedback",()=>{it("renders empty state",()=>{render(<EmptyState/>);expect(screen.getByRole("status")).toBeInTheDocument()});it("renders retryable error",()=>{render(<ErrorView message="Tracker unavailable" onRetry={()=>{}}/>);expect(screen.getByRole("alert")).toHaveTextContent("Tracker unavailable")})});
