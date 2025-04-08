import { useState } from "react";

const dummyCourses = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Course ${i + 1}`,
  image: `https://via.placeholder.com/300x200?text=Course+${i + 1}`,
  status: i % 3 === 0 ? "upcoming" : i % 3 === 1 ? "registered" : "completed",
}));

const COURSES_PER_PAGE = 4;

const CourseSection = ({ title, status, courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = courses.filter((c) => c.status === status);
  const totalPages = Math.ceil(filtered.length / COURSES_PER_PAGE);

  const paginatedCourses = filtered.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {paginatedCourses.map((course) => (
          <div key={course.id} className="border rounded overflow-hidden shadow">
            <div className="overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
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
        <span>
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
    </div>
  );
};

 function MyCoursesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <CourseSection title="Upcoming Courses" status="upcoming" courses={dummyCourses} />
      <CourseSection title="Courses I Registered" status="registered" courses={dummyCourses} />
      <CourseSection title="Completed Courses" status="completed" courses={dummyCourses} />
    </div>
  );
}
export default MyCoursesPage;
