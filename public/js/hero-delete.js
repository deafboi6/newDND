const deleteBtnHandler = async (event) => {
    if (event.target.getAttribute("data-id")); {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/heroes/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("failed to delete hero!");
        }
    }
};

document.querySelector("#deleteBtn").addEventListener("click", deleteBtnHandler);

