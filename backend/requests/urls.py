from django.urls import path
from .views import (
    LoanView,
    LoanHistoryView,
    FinancialaidView,
    FinancialaidHistoryView,
    LoanCheckView,
    FinancialaidCheckView,
    UpdateRequestView,
    testFileUpload,

)


urlpatterns = [
    path("loans/", LoanView.as_view()),
    path("loans/history/", LoanHistoryView.as_view()),
    path("loans/check/", LoanCheckView.as_view()),
    # for the update view loan/financial-aid
    path('<str:request_type>/<int:pk>' ,UpdateRequestView.as_view() ),

    path("financial-aids/", FinancialaidView.as_view()),
    path("financial-aids/history/", FinancialaidHistoryView.as_view()),
    path("financial-aids/check", FinancialaidCheckView.as_view()),
    # just for testing UploadFileView
    path("file/", testFileUpload.as_view()),
]
