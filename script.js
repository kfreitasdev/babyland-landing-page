document.addEventListener("DOMContentLoaded", () => {
    // 1. Sticky Header Logic
    const header = document.getElementById("main-header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. Instagram DM Tour Modal Logic
    const modal = document.getElementById("tourModal");
    const triggerBtns = document.querySelectorAll(".trigger-tour-modal");
    const closeBtn = document.getElementById("closeModal");

    // Open Modal
    triggerBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Close on outside click
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // 3. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            // Toggle active class on question
            question.classList.toggle("active");

            // Toggle max-height on answer
            const answer = question.nextElementSibling;
            if (question.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }

            // Close other open answers
            faqQuestions.forEach(q => {
                if (q !== question && q.classList.contains("active")) {
                    q.classList.remove("active");
                    q.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

    // 4. Input interactions / simple scroll animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Optional: Stop observing once faded in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with fade-in class
    document.querySelectorAll(".fade-in").forEach(element => {
        observer.observe(element);
    });
});
