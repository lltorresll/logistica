import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

describe("DashboardHeader Component", () => {
  test("debe mostrar el nombre del usuario y disparar el evento onNew", () => {
    const mockOnNew = jest.fn();
    const testUser = { username: "Juan Torres" };
    render(<DashboardHeader user={testUser} onNew={mockOnNew} />);
    const welcomeMsg = screen.getByText(/Bienvenido, Juan Torres/i);
    expect(welcomeMsg).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /Nueva Cita/i });
    fireEvent.click(button);
    expect(mockOnNew).toHaveBeenCalledTimes(1);
  });
});
