import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NewTaskForm from "../components/NewTaskForm";
import { CATEGORIES } from "../data";

test("calls the onTaskFormSubmit callback prop when the form is submitted", () => {
  const onTaskFormSubmit = jest.fn();
  render(
    <NewTaskForm categories={CATEGORIES} onTaskFormSubmit={onTaskFormSubmit} />
  );

  // Fill in the task details
  fireEvent.change(screen.getByLabelText(/Details/), {
    target: { value: "Pass the tests" },
  });

  // Select a category
  fireEvent.change(screen.getByLabelText(/Category/), {
    target: { value: "Code" },
  });

  // Submit the form by getting the form closest to the submit button
  fireEvent.submit(screen.getByRole("button", { name: /Add Task/i }).closest("form"));

  // Check if the callback was called with the expected task details
  expect(onTaskFormSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      text: "Pass the tests",
      category: "Code",
    })
  );
});
