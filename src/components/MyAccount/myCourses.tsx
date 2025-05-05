import { useState, useEffect } from "react";

const COURSES_PER_PAGE = 4;

const CourseSection = ({ title, status, courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = courses.filter((c) => c.status === status);
  const totalPages = Math.ceil(filtered.length / COURSES_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1); // reset when filter changes
  }, [status, courses]);

  const paginatedCourses = filtered.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {filtered.length === 0 ? (
        <p className="text-gray-500">No courses in this section.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {paginatedCourses.map((course) => (
              <div key={course.id} className="border rounded overflow-hidden shadow">
                <img
                  src={course.image || "/images/placeholder.png"}
                  alt={course.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

function MyCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      // Simulate "status"
      const extended = data.map((item, i) => ({
        ...item,
        status: i % 3 === 0 ? "upcoming" : i % 3 === 1 ? "registered" : "completed",
      }));

      setCourses(extended);
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <CourseSection title="Upcoming Courses" status="upcoming" courses={courses} />
      <CourseSection title="Courses I Registered" status="registered" courses={courses} />
      <CourseSection title="Completed Courses" status="completed" courses={courses} />
    </div>
  );
}

export default MyCoursesPage;
