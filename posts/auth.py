from allauth.account.adapter import DefaultAccountAdapter
from django.urls import reverse
from django.conf import settings

class CustomAdapter(DefaultAccountAdapter):
  def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        user.grade=form.cleaned_data.get('grade')
        user.save()
        return user
